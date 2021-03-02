import React, { Component } from 'react'

export default class Credits extends Component {
    render() {
        return (
            <div className="wrapper">
                <h1 className="no-margin">Credits</h1>
                <p className="no-margin">Taking a moment to appreciate those who helped make this happen.</p>
                <ul>
                    <li><b>Icons</b></li>
                    <ul>
                        <li><a href="https://fontawesome.com/" target="_blank" rel="noopener noreferrer">Font Awesome</a></li>
                        <li><a href="https://www.flaticon.com/authors/freepik" target="_blank" rel="noopener noreferrer">Freepik @ Flaticon.com</a></li>
                        <li><a href="https://thenounproject.com/term/meerkat/1081909/" target="_blank" rel="noopener noreferrer">Meerkat by Anniken &amp; Andreas from the Noun Project</a></li>
                    </ul>
                    <li><b>Mom &amp; Dad</b></li>
                </ul>
            </div>
        )
    }
}
