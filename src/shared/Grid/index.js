import React from 'react';
import styled from 'styled-components';

const TableStyle = styled("div")`
    display: flex;
    width: 100%;
    overflow: scroll;
`;

const TableColumnStyle = styled("div")`
    
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
`;

const TableCellStyle = styled("div")`
    width: 100%;
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
                take: props.take || 20,
                page: 1,
            },
            dataResult: props.data,
        }
        
        this.generateDataResult = this.generateDataResult.bind(this);
        this.onSortChange = this.onSortChange.bind(this);
        this.onFilterChange = this.onFilterChange.bind(this);
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

        dataState.filters.forEach(filter => {
            const dataStateField = this.props.fields.find(({name}) => name === filter.field); 
            if (dataStateField.filter === 'dropdown') {
                result = result.filter(row => filter.value ? row[filter.field] === filter.value : true);
            } else {
                result = result.filter(row => row[filter.field].toUpperCase().includes(filter.value.toUpperCase()));
            }
        });

        if (sortDir) {
            result.sort(compare);
        }
        
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

    render() {
        const UpArrow = <div className="arrow arrow-up">&#9663;</div>
        const DownArrow = <div className="arrow arrow-down">&#9663;</div>

        return (
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
                            this.state.dataResult.map((dataItem, index) => (
                                <TableCellStyle key={field.name+index}>
                                    {dataItem[field.name]}
                                </TableCellStyle>
                            ))
                        }
                    </TableColumnStyle>
                ))}
            </TableStyle>
        )
    }
}