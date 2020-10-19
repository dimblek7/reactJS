import get from "lodash/get";
import { default as React } from "react";
import { Route, Switch } from "react-router-dom";
import TokenManager from "utils/TokenManager";
import Header from "../components/header";
// import LeftNav from "../components/leftnav";
import dashboard from "../containers/dashboard";

export default function NavWrapper(props) {
  React.useEffect(() => {
    const data = JSON.parse(TokenManager.getUserData());
    if (get(data, "client_id", "") == 10) {
      props.history.push("/signup");
    }
  }, []);

  // <div className={`container-fluid bg-light-grey ${pathname.replace('/', '')}`} id="main-body">
  return (
    <div className={`container-fluid bg-light-grey`} id="main-body">
      <Header {...props} />
      <div className="row otherbody" id="application-wrapper">
        {/* <LeftNav /> */}

        <div className="col pay-rec-wrap mp-0">
          {/* switch body here */}
          <Switch>
            <Route exact path="/" component={dashboard} />
            <Route exact path="/dashboard" component={dashboard} />
            <Route path="**" component={() => <div>not found</div>} />
          </Switch>
        </div>
      </div>
    </div>
  );
}
