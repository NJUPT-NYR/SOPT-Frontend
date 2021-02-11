var t = require("@babel/types");

// TODO set up unit test
module.exports = {
  visitor: {
    ImportDefaultSpecifier(path) {
      var parent = path.parent;
      var node = path.node;
      if (
        t.isImportDeclaration(parent) &&
        /\.module\.css/.test(parent.source.value)
      ) {
        var originName = node.local.name;
        node.local.name = "__" + originName;
        path.parentPath.insertAfter(
          t.variableDeclaration("var", [
            t.variableDeclarator(
              t.identifier(originName),
              t.memberExpression(
                t.identifier(node.local.name),
                t.identifier("locals")
              )
            ),
          ])
        );
      }
    },
  },
};
