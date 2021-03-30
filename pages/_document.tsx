import { CssBaseline } from '@geist-ui/react'
import Document, { DocumentContext, Head, Html, Main, NextScript } from 'next/document'
import React from 'react'
import { createGenerateId, JssProvider, SheetsRegistry } from 'react-jss'

export default class MyDocument extends Document {
  render(): JSX.Element {
    return (
      <Html lang="en">
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

MyDocument.getInitialProps = async (ctx: DocumentContext) => {
  // REACT-JSS START
  const registry = new SheetsRegistry()
  const generateId = createGenerateId()
  const originalRenderPage = ctx.renderPage
  ctx.renderPage = () =>
    originalRenderPage({
      // eslint-disable-next-line react/display-name
      enhanceApp: App => props => (
        <JssProvider registry={registry} generateId={generateId}>
          <App {...props} />
        </JssProvider>
      )
    })
  // REACT-JSS END

  const initialProps = await Document.getInitialProps(ctx)

  // GEIST-UI
  const styles = CssBaseline.flush()

  return {
    ...initialProps,
    styles: (
      <>
        {initialProps.styles}
        {/* GEIST-UI */}
        {styles}
        {/* REACT-JSS START */}
        <style id="server-side-styles">{registry.toString()}</style>
      </>
    )
  }
}
