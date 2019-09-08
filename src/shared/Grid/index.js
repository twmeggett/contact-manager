import React from 'react';
import styled from 'styled-components';

const TableStyle = styled("div")`
    display: flex;
    width: 100%;
    overflow: scroll;
`;

const TableColumnStyle = styled("div")`
    flex-grow: 1;
`;

const TableHeadStyle = styled("div")`
    width: 100%;
    .arrow {
        display: inline-block;
        height: 100%;

        &.arrow-up {
            transform: rotate(180deg);
        }
    }
`;

const TableFilterStyle = styled("div")`
    width: 100%;
    height: 50px;
`;

const TableCellStyle = styled("div")`
    width: 100%;
    height: 30px;
    cursor: pointer;
`;

const PaginationStyle = styled("div")`
    display: flex;
    justify-content: space-between;
    width: 100%;

    .page-icons {
        display: flex;
        color: blue;

        .page-icon {
            font-size: 17px;
            padding: 0 10px;
            cursor: pointer;

            &.active {
                background: lightgrey;
            }
        }
    }
`;

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataState: {
                filters: props.fields.map(field => ({
                    field: field.name,
                    value: ''
                })),
                sort: {
                    dir: '',
                    field: ''
                },
                take: 10,
                page: 1,
                groups: props.groups || [],
            },
            dataResult: [],
        }
        
        this.generateDataResult = this.generateDataResult.bind(this);
        this.onSortChange = this.onSortChange.bind(this);
        this.onFilterChange = this.onFilterChange.bind(this);
        this.onTakeChange = this.onTakeChange.bind(this);
        this.onPageClick = this.onPageClick.bind(this);
        this.getPageIndexes = this.getPageIndexes.bind(this);
        this.createPages = this.createPages.bind(this);
        this.applyGroup = this.applyGroup.bind(this);
    }

    componentDidMount() {
        this.generateDataResult(this.state.dataState);
    }

    componentDidUpdate(prevProps) {
        if (this.props.data.length !== prevProps.data.length) {
            this.generateDataResult(this.state.dataState);
        }
    }

    generateDataResult(dataState) {
        let result = this.props.data;
        const sortDir = dataState.sort.dir;
        const compare = (a, b) => {
            const sortField = dataState.sort.field;
            const valueA = a[sortField].toUpperCase();
            const valueB = b[sortField].toUpperCase();
          
            let comparison = 0;
            if (valueA && valueA > valueB) {
              comparison = sortDir === 'asc' ? 1 : -1;
            } else if (valueA && valueA < valueB) {
              comparison = sortDir === 'asc' ? -1 : 1;
            }
            return comparison;
        }
        
        // apply filters
        dataState.filters.forEach(filter => {
            const dataStateField = this.props.fields.find(({name}) => name === filter.field); 
            if (dataStateField.filter === 'dropdown') {
                result = result.filter(row => filter.value ? row[filter.field] === filter.value : true);
            } else {
                result = result.filter(row => row[filter.field].toUpperCase().includes(filter.value.toUpperCase()));
            }
        });
        //apply sort
        if (sortDir) {
            result.sort(compare);
        }
        //reset grouping
        this.groupName = '';
        //update dataState and dataResult
        this.setState({
            dataState,
            dataResult: result,
        })
    }

    onSortChange(field) {
        let dir = 'asc';
        if (this.state.dataState.sort.field === field) {
            if (this.state.dataState.sort.dir === 'asc') {
                dir = 'desc';
            } else if (this.state.dataState.sort.dir === 'desc') {
                dir = '';
                field = '';
            }
        }
        this.generateDataResult({
            ...this.state.dataState,
            sort: {
                dir,
                field,
            }
        });
    }

    onFilterChange(field) {
        return (event) => {
            this.generateDataResult({
                ...this.state.dataState,
                filters: this.state.dataState.filters.map((filter) => ({
                    ...filter,
                    value: filter.field === field ? event.target.value : filter.value
                }))
            });
        }
    }

    onTakeChange(event) {
        this.generateDataResult({
            ...this.state.dataState,
            take: event.target.value,
        })
    }

    onPageClick(page) {
        this.groupName = '';
        return () => {
            this.setState({
                dataState: {
                    ...this.state.dataState,
                    page: Number(page),
                }
            })
        }
    }

    getPageIndexes() {
        const endIndex = (this.state.dataState.page * this.state.dataState.take) - 1;
        const startIndex = endIndex - this.state.dataState.take;
        return {
            endIndex,
            startIndex,
        }
    }

    createPages() {
        let page = 1;
        let elements = [];
        let pageCount = Math.ceil(this.state.dataResult.length / this.state.dataState.take);

        const createPageIcon = () => {
            elements.push(
                <div
                    className={`page-icon ${page === this.state.dataState.page ? 'active' : ''}`}
                    onClick={this.onPageClick(page)}
                    key={'page'+page}
                >
                    {page}
                </div>
            )
            pageCount--;
            page++;
            if (pageCount > 0) {
                createPageIcon();
            }
        }
        createPageIcon();

        return elements;
    }

    applyGroup(fieldName) {
        let hide = false;

        if (this.state.dataState.groups.includes(fieldName)) {
            if (this.groupName === fieldName) {
                hide = true
            } else {
                this.groupName = fieldName;
            }
        }
        return hide;
    }

    groupName = '';

    render() {
        const UpArrow = <div className="arrow arrow-up">&#9663;</div>
        const DownArrow = <div className="arrow arrow-down">&#9663;</div>
        const indexes = this.getPageIndexes();
        const rows = this.state.dataResult.filter((row, index) => index >=  indexes.startIndex && index <= indexes.endIndex);
        
        return (
            <>
                <TableStyle>
                    {this.props.fields.map(field => (
                        <TableColumnStyle key={field.name}>
                            <TableHeadStyle onClick={() => this.onSortChange(field.name)}>
                                {field.title} {field.name === this.state.dataState.sort.field ? this.state.dataState.sort.dir === 'asc' ? UpArrow : DownArrow : ''}
                            </TableHeadStyle>
                            <TableFilterStyle>
                                <>
                                {
                                    field.filter === 'dropdown' ? (
                                        <select onChange={this.onFilterChange(field.name)}>
                                            <option value=""></option>
                                            {
                                                field.options.map(({label, value}, index) => (
                                                    <option value={value} key={`dropdown${field.name + index}`}>{label}</option>
                                                ))
                                            }
                                        </select>
                                    ) : (
                                        <input
                                            onChange={this.onFilterChange(field.name)}
                                            value={this.state.dataState.filters.find((filter) => filter.field === field.name).value} />
                                    )
                                }
                                </>
                            </TableFilterStyle>
                            {
                                rows.map((row, index) => (
                                    <TableCellStyle key={field.name+index} onClick={field.onClick(row)}>
                                        {row[field.name] || '-'}
                                    </TableCellStyle>
                                ))
                            }
                        </TableColumnStyle>
                    ))}
                </TableStyle>
                <PaginationStyle>
                    <div className="page-icons">
                        Pages: {this.createPages()}
                    </div>
                    <div className="take-selector">
                        # of rows to show
                        <select onChange={this.onTakeChange} value={this.state.dataState.take}>
                            <option value={10}>10</option>
                            <option value={25}>25</option>
                            <option value={50}>50</option>
                            <option value={100}>100</option>
                        </select>
                    </div>
                </PaginationStyle>
            </>
        )
    }
}