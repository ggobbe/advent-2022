const input = await Deno.readTextFile("./inputs/input7");
const lines = input.split("\n");

enum NodeType {
  Directory = "directory",
  File = "file",
}
type Node = {
  path: string;
  type: NodeType;
};
type DirectoryNode = Node & {
  parent?: DirectoryNode;
  children: (DirectoryNode | FileNode)[];
  size?: number;
};

type FileNode = Node & {
  size: number;
};

const filesystem: DirectoryNode = {
  path: "/",
  children: [],
  type: NodeType.Directory,
};
let currentDir: DirectoryNode = filesystem;
let listing = false;

for (const line of lines) {
  const commandMatch = line.match(/^\$ (\w+)\s?([\w|\.|\/]+)?/);
  if (commandMatch) {
    listing = false;

    const [_, cmd, arg] = commandMatch;

    switch (cmd) {
      case "cd": {
        changeDirectory(arg);
        break;
      }
      case "ls":
        listing = true;
        break;
    }
  } else if (listing) {
    const fileMatch = line.match(/^(\d+) ([\w|\.]+)/);
    if (fileMatch) {
      const [_, size, name] = fileMatch;
      currentDir.children.push({
        path: name,
        type: NodeType.File,
        size: +size,
      });
    }

    const dirMatch = line.match(/^dir (\w+)/);
    if (dirMatch) {
      const [_, dir] = dirMatch;
      currentDir.children.push({
        path: dir,
        type: NodeType.Directory,
        children: [],
        parent: currentDir,
      });
    }
  }
}

computeSize(filesystem);
const smallerThan = findSmallerThanDirectories(filesystem, 100000);
smallerThan.map((st) => removeParents(st));
//console.log(JSON.stringify(smallerThan, null, 2));

console.log(smallerThan.reduce((accumulator, node) => {
    return accumulator + (node.size ?? 0)
}, 0));

function changeDirectory(target: string) {
  switch (target) {
    case "/":
      currentDir = filesystem;
      break;
    case "..": {
      if (!currentDir.parent) {
        throw new Error(`missing parent: ${JSON.stringify(currentDir)}`);
      }
      currentDir = currentDir.parent;
      break;
    }
    default: {
      const existing = currentDir.children.find(
        (c) => c.path === target
      ) as DirectoryNode;
      if (existing) {
        currentDir = existing;
        break;
      }

      const newDir = {
        path: target,
        type: NodeType.Directory,
        parent: currentDir,
        children: [],
      };
      currentDir.children.push(newDir);
      currentDir = newDir;

      break;
    }
  }
}

function computeSize(node: Node): number {
  if (node.type === NodeType.File) {
    return (node as FileNode).size;
  } else {
    const directoryNode = node as DirectoryNode;
    const totalSize = directoryNode.children.reduce((accumulator, value) => {
      return accumulator + computeSize(value);
    }, 0);
    directoryNode.size = totalSize;
    return totalSize;
  }
}

function findSmallerThanDirectories(
  node: DirectoryNode,
  maxSize: number
): DirectoryNode[] {
  const candidates: DirectoryNode[] = [];
  if (!node.size) {
    throw new Error(`missing size on directory ${node.path}`);
  }

  if (node.size < maxSize) {
    candidates.push(node);
  }

  node.children.forEach((n) => {
    if ("parent" in n) {
      const largeChildren = findSmallerThanDirectories(n, maxSize);
      candidates.push(...largeChildren);
    }
  });

  return candidates;
}

function removeParents(node: DirectoryNode) {
  node.parent = undefined;
  node.children.map((c) => {
    if ("parent" in c) {
      removeParents(c);
    }
  });
}
