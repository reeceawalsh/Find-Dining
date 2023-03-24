import React from "react";

export default function Header(props) {
    return (
        <div className="container">
            <h1>{props && props.name}</h1>
            <h2>{props.save && props.save}</h2>
        </div>
    );
}
