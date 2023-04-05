import React from "react";

export default function Header(props) {
    return (
        <div className="container">
            <h1>{props.name && props.name}</h1>
        </div>
    );
}
