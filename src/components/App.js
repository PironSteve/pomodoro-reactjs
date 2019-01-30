import React from "react";
import Header from './Header'
import Timer from './Timer'

class App extends React.Component {
    render() {
        return <div>
            <Header/>
            <Timer/>
        </div>
    }
}

export default App