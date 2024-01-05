import { Link } from "@inertiajs/react";
import React from "react";

export default function Pagination({ links }) {
    function getClassName(active) {
        if (active) {
            return "join-item btn btn-sm btn-active";
        } else {
            return "join-item btn btn-sm ";
        }
    }

    return (
        links.length > 3 && (
            <div className="join">
                {links.map((link, key) =>
                    link.url === null ? (
                        <div className="join-item btn btn-sm">
                            <div dangerouslySetInnerHTML={{ __html: `${link.label}` }} />
                        </div>
                    ) : (
                        <Link
                            className={getClassName(link.active)}
                            href={link.url}
                        >
                            <div dangerouslySetInnerHTML={{ __html: `${link.label}` }} />
                        </Link>
                    )
                )}
            </div>
        )
    );
}
