import React from 'react';
import {
  Grid, Icon, IconButton, Menu, MenuItem, MenuList, Table, TableBody, TableCell, TableHead, TablePagination,
  TableRow
} from 'material-ui';

const PER_PAGE = 10;

export default class StocktakeTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 0,
      anchorEl: null
    }
  }

  _onChangePage(page) {
    this.setState({
      page: page
    })
  }

  _openMenu(e) {
    this.setState({
      anchorEl: e.target
    })
  }

  _handleClose() {
    this.setState({
      anchorEl: null
    })
  }

  _selectStocktakeItem(row) {
    this.props.selectStocktakeItem(this.props.stocktakeItems[(this.state.page * PER_PAGE) + row]);
  }

  render() {
    return <Grid container justify={'flex-end'}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Status</TableCell>
            <TableCell>Stocktake ID</TableCell>
            <TableCell>Total Registered Items</TableCell>
            <TableCell>Counted Items</TableCell>
            <TableCell>Date Started</TableCell>
            <TableCell>Responsible</TableCell>
            <TableCell> </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {this.props.stocktakeItems.slice(this.state.page * PER_PAGE, PER_PAGE * (this.state.page + 1)).map((item, i) => {
            return <TableRow key={i} hover>
              <TableCell onClick={() => this._selectStocktakeItem(i)}>{item.status}</TableCell>
              <TableCell onClick={() => this._selectStocktakeItem(i)}>{item.number}</TableCell>
              <TableCell onClick={() => this._selectStocktakeItem(i)}>{item.registered}</TableCell>
              <TableCell onClick={() => this._selectStocktakeItem(i)}>{item.counted}</TableCell>
              <TableCell onClick={() => this._selectStocktakeItem(i)}>{new Date(item.dateStarted * 1000).toDateString()}</TableCell>
              <TableCell onClick={() => this._selectStocktakeItem(i)}>{item.startedBy.length > 0 ? item.startedBy[0] : ''}</TableCell>
              <TableCell>
                <IconButton onClick={(e) => this._openMenu(e)}>
                  <Icon className={'fas fa-ellipsis-v'}/>
                </IconButton>
                <Menu anchorEl={this.state.anchorEl} open={Boolean(this.state.anchorEl)} onClose={() => this._handleClose()}>
                  <MenuItem onClick={() => alert('hello')}>Cancel</MenuItem>
                  <MenuItem onClick={() => alert('hello')}>Cancel</MenuItem>
                  <MenuItem onClick={() => alert('hello')}>Cancel</MenuItem>
                </Menu>
              </TableCell>
            </TableRow>
          })}
        </TableBody>
      </Table>
      <TablePagination
        component="div"
        count={this.props.stocktakeItems.length}
        rowsPerPage={PER_PAGE}
        rowsPerPageOptions={[]}
        page={this.state.page}
        backIconButtonProps={{
          'aria-label': 'Previous Page',
        }}
        nextIconButtonProps={{
          'aria-label': 'Next Page',
        }}
        onChangePage={(e, page)=>{this._onChangePage(page)}}
      />
    </Grid>

  }
}
