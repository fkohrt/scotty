import React, { ReactElement } from "react"
import { Route } from "react-router-dom"

import BeamingModal from "./BeamingModal"
import Loading from "./Loading"
import LinkModal from "./LinkModal"
import NavBar from "./NavBar"
import ToolBar from "./ToolBar"
import ZoomBar from "./ZoomBar"

const TestRoutes = (): ReactElement => {
  return (
    <>
      <Route path="/test/loading" component={Loading} />
      <Route
        path="/test/BeamingModal"
        render={(): ReactElement => (
          <BeamingModal
            filename="filename.pdf"
            message="Message from server"
            handleTryAgain={(): void => {}}
          />
        )}
      />

      <Route
        path="/test/BeamingModal-error"
        render={(): ReactElement => (
          <BeamingModal
            filename="filename.pdf"
            error="Error message"
            handleTryAgain={(): void => {}}
          />
        )}
      />

      <Route
        path="/test/LinkModal"
        render={(): ReactElement => <LinkModal link="http://testlink.com" />}
      />

      <Route
        path="/test/NavBar"
        render={(): ReactElement => (
          <NavBar
            pageNum={1}
            maxPage={2}
            filename="test"
            users={[]}
            handleChangePage={(): void => {}}
            handleClose={(): void => {}}
          />
        )}
      />

      <Route
        path="/test/ZoomBar"
        render={(): ReactElement => <ZoomBar handleZoom={(): void => {}} />}
      />

      <Route
        path="/test/ToolBar"
        render={(): ReactElement => (
          <ToolBar
            showMouse={false}
            pointerColor="#ffffff"
            handleToolBarButton={(): void => {}}
          />
        )}
      />
    </>
  )
}

export default TestRoutes