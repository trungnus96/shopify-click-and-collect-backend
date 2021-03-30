import Document, { Head, Main, NextScript } from "next/document";
import { Fragment } from "react";
import flush from "styled-jsx/server";
import { ServerStyleSheet } from "styled-components";
import { ServerStyleSheets } from "@material-ui/styles";

// postcss
import postcss from "postcss";
import autoprefixer from "autoprefixer";
import cssnano from "cssnano";

const prefixer = postcss([autoprefixer]);
const minifier = postcss([cssnano]);

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const styled_sheet = new ServerStyleSheet();
    const material_ui_sheets = new ServerStyleSheets();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: App => props =>
            styled_sheet.collectStyles(
              material_ui_sheets.collect(<App {...props} />)
            )
        });

      const initialProps = await Document.getInitialProps(ctx);

      let material_ui_css = material_ui_sheets.toString();
      if (process.env.NODE_ENV === "production") {
        const result1 = await prefixer.process(material_ui_css);
        material_ui_css = result1.css;
        const result2 = await minifier.process(material_ui_css);
        material_ui_css = result2.css;
      }

      return {
        ...initialProps,
        styles: (
          <Fragment>
            {initialProps.styles}
            {styled_sheet.getStyleElement()}
            <style
              id="jss-server-side"
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{ __html: material_ui_css }}
            />
            {flush() || null}
          </Fragment>
        )
      };
    } finally {
      styled_sheet.seal();
    }
  }

  render() {
    return (
      <html lang="en">
        <Head>
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content={
              "user-scalable=0, initial-scale=1, " +
              "minimum-scale=1, width=device-width, height=device-height"
            }
          />
          <link rel="manifest" href="/static/manifest.json"></link>
          <link rel="shortcut icon" href="/static/favicon.ico"></link>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
