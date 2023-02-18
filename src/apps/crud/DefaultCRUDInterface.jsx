import React, {useEffect, useRef, useState} from "react"
import {CustomCRUDInterface} from "./CustomCRUDInterface";
import lunr from "lunr";
import _ from "lodash";
import Add from "@material-ui/icons/Add";
import Edit from "@material-ui/icons/Edit";
import VisibilityIcon from "@material-ui/icons/Visibility";
import Delete from "@material-ui/icons/Delete";
import PropTypes from "prop-types";

// TODO: consider caching this. If use _.momoize, need to figure out how to override resolver func
const sortItems = (items, sortBy, isAsc) => {
    return _.orderBy(items, [ sortBy ], [ isAsc ? "asc" : "desc" ]);
}

const filterItems = (searchIndex, items, query) => {
    const term = "*" + query.replace(/([-:~+^])/g, "\\$1") + "*";
    const results = searchIndex.search(term);
    return results.map(({ ref }) => items[ref]);
}

const paginateItems = (items, limit, currPage) => {
    const chunks = _.chunk(items, limit);
    return {
        currItems: _.isEmpty(chunks) ? [] : chunks[currPage - 1],
        pageCount: chunks.length,
    };
}

const getSortOptions = _.memoize(schema => {
    return _.filter(schema, schema => Boolean(schema.sortable))
        .map(schema => ({
            display: schema.label,
            value: schema.key
        }))
})

const getToolbarActions = ({ hasCreate, extraButtons = [] }) => {
    if (!hasCreate) {
        return [
            {
                "display": "Add",
                "value": "create",
                "icon": <Add color={"primary"}/>
            },
            ...extraButtons
        ];
    } else {
        return [
            ...extraButtons
        ]
    }

}

const getActionColumnAction = ({ hasRead, hasUpdate, hasDelete, extraButtons = [] }) => {
    const rtn = [];
    if (hasRead) {
        rtn.push({
            "display": "View",
            "value": "read",
            "icon": <VisibilityIcon color={"primary"}/>
        });
    }
    if (hasUpdate) {
        rtn.push({
            "display": "Edit",
            "value": "update",
            "icon": <Edit color={"primary"}/>
        });
    }
    if (hasDelete) {
        rtn.push({
            "display": "Delete",
            "value": "delete",
            "icon": <Delete color={"secondary"}/>,
            "color": "secondary"
        });
    }

    return [
        ...rtn,
        ...extraButtons
    ];
}

export const DefaultCRUDInterface = ({
    title,
    items,
    schema,
    countPerPage,
    toolbarOptions,
    actionOptions,
    onCreate,
    onRead,
    onUpdate,
    onDelete,
    onOtherAction,
    initSortBy = 'id',
    initIsSortAsc,
}) => {
    const [ sortBy, setSortBy ] = useState(initSortBy);
    const [ isSortAsc, setSortAsc ] = useState(initIsSortAsc);
    const [ query, setQuery ] = useState("");
    const [ currPage, setCurrPage ] = useState(1);
    const mountRef = useRef({
        searchIndex: null
    });

    const sortOptions = getSortOptions(schema);
    useEffect(() => {
        const searchIndex = lunr(function () {
            // TODO: Probably there is a better way to add ref
            this.ref("__idx");
            schema.forEach(({ key, indexIgnore }) => {
                if (indexIgnore) {
                    return;
                }
                this.field(key);
            })
            items.forEach((item, index) => {
                this.add({
                    ...item,
                    "__idx": index
                });
            });
        })
        mountRef.current.searchIndex = searchIndex;
    }, [items, sortOptions, countPerPage, schema]);

    const handleSortChange = ({ value, isAsc }) => {
        setCurrPage(1);
        setSortBy(value);
        setSortAsc(isAsc);
    }

    const handleSearchChange = value => {
        setCurrPage(1);
        setQuery(value)
    };
    const handlePageChange = (evt, value) => setCurrPage(value);

    const handleAction = (action, payload) => {
        switch (action) {
            case "create":
                onCreate();
                break;
            case "read":
                onRead(payload);
                break;
            case "update":
                onUpdate(payload);
                break;
            case "delete":
                onDelete(payload);
                break;
            default:
                onOtherAction && onOtherAction(action, payload);
                break;
        }
    }

    const {
        buttons: toolbarButtons
    } = toolbarOptions;

    const {
        buttons: actionButtons
    } = actionOptions;
    const { searchIndex } = mountRef.current;
    const filtered = query ? filterItems(searchIndex, items, query) : items
    const sorted = sortItems(filtered, sortBy, isSortAsc);
    const {
        currItems,
        pageCount,
    } = paginateItems(sorted, countPerPage, currPage);

    return (
        <CustomCRUDInterface
            title={title}
            items={currItems}
            schema={schema}
            search={query}
            sortBy={sortBy}
            isSortAsc={isSortAsc}
            pageCount={pageCount}
            currPage={currPage}
            sortOptions={sortOptions}
            toolbarOptions={getToolbarActions({
                hasCreate: Boolean(onCreate),
                extraButtons: toolbarButtons
            })}
            actionOptions={getActionColumnAction({
                hasRead: Boolean(onRead),
                hasUpdate: Boolean(onUpdate),
                hasDelete: Boolean(onDelete),
                extraButtons: actionButtons
            })}
            onSearchChange={handleSearchChange}
            onSortChange={handleSortChange}
            onPageChange={handlePageChange}
            onEntityAction={handleAction}
            onToolbarAction={handleAction}
        />
    )
}

DefaultCRUDInterface.defaultProps = {
    items: [],
    schema: [],
    countPerPage: 5,
    toolbarOptions: {},
    actionOptions: {},
}

DefaultCRUDInterface.propTypes = {
    items: PropTypes.arrayOf(PropTypes.object).isRequired,
    schema: PropTypes.arrayOf(PropTypes.shape({
        "size": PropTypes.oneOf(["small", "medium", "large", "xlarge"]).isRequired,
        "label": PropTypes.string.isRequired,
        "key": PropTypes.string.isRequired,
        "sortable": PropTypes.bool
    })).isRequired,
    countPerPage: PropTypes.number,
    onCreate: PropTypes.func,
    onRead: PropTypes.func,
    onUpdate: PropTypes.func,
    onDelete: PropTypes.func,
    toolbarOptions: PropTypes.shape({
        buttons: PropTypes.arrayOf(PropTypes.shape({
            display: PropTypes.string.isRequired,
            value: PropTypes.string.isRequired,
            color: PropTypes.string
        }))
    }),
    actionOptions: PropTypes.shape({
        buttons: PropTypes.arrayOf(PropTypes.shape({
            display: PropTypes.string.isRequired,
            value: PropTypes.string.isRequired,
            color: PropTypes.string
        }))
    })
}