var core = require("@babel/core"),
  transformCssModulePlugin = require("../transform-css-module.babel");

describe("Transfrom Css Module Babel Plugin", () => {
  it("should transform css module file", (done) => {
    var result = core.transformSync('import styles from "home.module.css";', {
      plugins: [transformCssModulePlugin],
    });
    expect(result.code).toBe(
      'import __styles from "home.module.css";\nvar styles = __styles.locals;'
    );
    done();
  });
  it("should not transform common css file", (done) => {
    var codeText = 'import styles from "home.css";';
    var result = core.transformSync(codeText, {
      plugins: [transformCssModulePlugin],
    });
    expect(result.code).toBe(codeText);
    done();
  });
});
