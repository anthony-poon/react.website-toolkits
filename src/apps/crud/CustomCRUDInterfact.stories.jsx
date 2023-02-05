import React, {useState, useEffect, useRef} from 'react';
import {ResponsiveCardContainer} from "../cards";
import _ from "lodash";
import { LoremIpsum } from "lorem-ipsum";
import {makeStyles} from "@material-ui/core/styles";
import {CustomCRUDInterface} from "./CustomCRUDInterface";
import Add from "@material-ui/icons/Add";

export default {
    component: CustomCRUDInterface,
    title: 'CustomCRUDInterface',
};

const useStyle = makeStyles(theme => ({
    container: {
        width: "100%",
        [theme.breakpoints.up("md")]: {
            width: 800,
        }
    }
}))

// TODO: consider caching this. If use _.momoize, need to figure out how to override resolver func
const sortItems = (items, sortBy, isAsc) => {
    return _.orderBy(items, [ sortBy ], [ isAsc ? "asc" : "desc" ]);
}

const filterItems = (searchIndex, items, query) => {
    const indexes = searchIndex.search(query);
    return indexes.map(i => items[i]);
}

const paginateItems = (items, limit, currPage) => {
    const chunks = _.chunk(items, limit);
    return {
        currItems: _.isEmpty(chunks) ? [] : chunks[currPage - 1],
        pageCount: chunks.length,
    };
}

const lorem = new LoremIpsum({
    sentencesPerParagraph: {
        max: 8,
        min: 4
    },
    wordsPerSentence: {
        max: 16,
        min: 4
    }
});

const Template = ({ items, render, countPerPage = 5, schema, toolbarOptions, sortOptions, actionOptions, ...rest }) => {
    const [ sortBy, setSortBy ] = useState("");
    const [ isSortAsc, setSortAsc ] = useState(false);
    const [ query, setQuery ] = useState("");
    const [ currPage, setCurrPage ] = useState(1);
    const mountRef = useRef({
        searchIndex: null
    });
    useEffect(() => {
        const searchIndex = new Index({
            "tokenize": "full"
        })
        const sortBy = sortOptions[0].value;
        setSortBy(sortBy);
        items.forEach((item, index) => {
            _.forEach(item, (value, key) => {
                searchIndex.add(index, value)
            })
        });
        mountRef.current.searchIndex = searchIndex;
    }, [items, sortOptions, countPerPage]);

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

    const { searchIndex } = mountRef.current;
    const filtered = query ? filterItems(searchIndex, items, query) : items
    const sorted = sortItems(filtered, sortBy, isSortAsc);
    const {
        currItems,
        pageCount,
    } = paginateItems(sorted, countPerPage, currPage);

    const classes = useStyle();
    return (
        <ResponsiveCardContainer>
            <div className={classes.container}>
                <CustomCRUDInterface
                    items={currItems}
                    schema={schema}
                    search={query}
                    sortBy={sortBy}
                    isSortAsc={isSortAsc}
                    pageCount={pageCount}
                    currPage={currPage}
                    sortOptions={sortOptions}
                    toolbarOptions={toolbarOptions}
                    actionOptions={actionOptions}
                    onSearchChange={handleSearchChange}
                    onSortChange={handleSortChange}
                    onPageChange={handlePageChange}
                    onEntityAction={console.log}
                    onToolbarAction={console.log}
                />
            </div>
        </ResponsiveCardContainer>
    );
}

const getPlaceholderItems = (count = 100) => {
    return [...Array(count)].map((value, index) => ({
        id: index + 1,
        firstName: lorem.generateWords(1),
        lastName: lorem.generateWords(1),
        address: lorem.generateSentences(1),
        description: lorem.generateParagraphs(1),
    }))
}

export const Default = Template.bind({});
Default.args = {
    items: getPlaceholderItems(),
    schema: [
        {
            "size": "small",
            "label": "ID",
            "key": "id"
        },{
            "size": "medium",
            "label": "First Name",
            "key": "firstName"
        },{
            "size": "medium",
            "label": "Last Name",
            "key": "lastName"
        },{
            "size": "large",
            "label": "Address",
            "key": "address"
        },{
            "size": "xlarge",
            "label": "Description",
            "key": "description"
        }
    ],
    toolbarOptions: [
        {
            "display": "Testing 1",
            "value": "t_testing_1"
        },{
            "display": "Testing 2",
            "value": "t_testing_2",
        },{
            "display": "Testing 3",
            "value": "t_testing_3",
            "color": "secondary"
        },
    ],
    actionOptions: [
        {
            "display": "Testing 1",
            "value": "e_testing_1"
        },{
            "display": "Testing 2",
            "value": "e_testing_2",
        },{
            "display": "Testing 3",
            "value": "e_testing_3",
            "color": "secondary"
        },
    ],
    sortOptions: [
        {
            "display": "ID",
            "value": "id",
        },{
            "display": "First Name",
            "value": "firstName",
        },{
            "display": "Last Name",
            "value": "lastName",
        },
    ]
};