const t = require("@babel/types");

// TODO set up unit test
module.exports = {
  visitor: {
    ImportDefaultSpecifier(path) {
      var parent = path.parent;
      var node = path.node;
      if (
        t.isImportDeclaration(parent) &&
        parent.source &&
        /\.modules\.css$/.test(parent.source.value)
      ) {
        var localName = node.local.name;
        path.parentPath.replaceWith(
          t.importDeclaration(
            [
              t.importSpecifier(
                t.identifier(localName),
                t.identifier("locals")
              ),
            ],
            parent.source
          )
        );
      }
    },
  },
};
