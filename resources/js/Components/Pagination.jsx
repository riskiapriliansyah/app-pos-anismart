import { Link } from "@inertiajs/react";
import React from "react";

export default function Pagination({ links }) {
    function getClassName(active) {
        if (active) {
            return "join-item btn btn-xs btn-active";
        } else {
            return "join-item btn btn-xs ";
        }
    }

    return (
        links.length > 3 && (
            <div className="join">
                {links.map((link, key) =>
                        link.url === null ? (
                            <div className="join-item btn btn-xs">
                                <div dangerouslySetInnerHTML={{__html: `${link.label}`}} />
                            </div>
                        ) : (
                            <Link
                                className={getClassName(link.active)}
                                href={link.url}
                            >
                                <div dangerouslySetInnerHTML={{__html: `${link.label}`}} />
                            </Link>
                        )
                    )}
            </div>
        )
    );
}
