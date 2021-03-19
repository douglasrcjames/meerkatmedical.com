import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Footer extends Component {
    constructor(props) {
        super(props);

        this.state = { 
          year: new Date().getFullYear(),
          deviceWidth: 0,
          deviceHeight: 0
        };
    }
      
    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    }
      
    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }
      
    updateWindowDimensions = () => {
        this.setState({ deviceWidth: window.innerWidth, deviceHeight: window.innerHeight });
    }

    render() {
        return (
            <footer>
                <div className={this.state.deviceWidth >= 1000 ? "f-container" : "hide"}>
                    <div className="left">
                        &nbsp;&nbsp;<Link to="/about">About</Link> | <Link to="/credits">Credits</Link>&nbsp;&nbsp;
                    </div>

                    <div className="center">
                        <div className="center-text">
                            &copy;
                            {' '}
                            {this.state.year}
                            {' '}
                            Meerkat Medical
                        </div>
                        <div className="center-text" style={{ fontSize: "12px" }}>
                            Medicare has neither reviewed nor endorsed this information.
                        </div>
                        <div className="center-text" style={{ fontSize: "12px" }}>
                            Not connected with or endorsed by the United States government or the federal Medicare program.
                        </div>
                    </div>

                    <div className="right">
                        <a href="https://www.douglasrcjames.com" target="_blank" rel="noopener noreferrer"><i className="fas fa-tools"/> by douglasrcjames</a> 
                        &nbsp;&nbsp;
                    </div>
                </div>
                <div className={this.state.deviceWidth < 1000 ? "f-container" : "hide"}>
                    <div>
                        <div className="center-text">
                            &copy;
                            {' '}
                            {this.state.year}
                            {' '}
                            Meerkat Medical
                        </div>
                    </div>
                    <div>
                        <a href="https://www.douglasrcjames.com" target="_blank" rel="noopener noreferrer"><i className="fas fa-tools"/> by douglasrcjames</a> 
                    </div>
                    <div>
                        <Link to="/about">About</Link> | <Link to="/credits">Credits</Link> 
                    </div>
                    <div className="center-text s-padding-b" style={{ fontSize: "12px" }}>
                        <div>
                            Medicare has neither reviewed nor endorsed this information.
                        </div>
                        <div>
                            Not connected with or endorsed by the United States government or the federal Medicare program.
                        </div>
                    </div>
                </div>
            </footer>
        )
    }
}
