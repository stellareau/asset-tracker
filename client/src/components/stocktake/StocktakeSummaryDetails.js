import React from 'react';
import {
  Button, Grid, Hidden, Icon, IconButton, Table, TableBody, TableCell, TableHead, TablePagination, TableRow,
  Typography
} from 'material-ui';
import StocktakeTutorial from './StocktakeTutorial';

const PER_PAGE = 10;

export default class StocktakeSummaryDetails extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 0
    }
  }

  componentWillReceiveProps(nextProps, nextContext) {
    if (nextProps.stocktakeItem !== this.props.stocktakeItem) {
      console.log(nextProps.stocktakeItem, this.props.stocktakeItem);
      console.log('here');
      clearTimeout(this.timer);
      this._startPoll();
    }
  }

  componentDidMount() {
    this._startPoll();
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  _startPoll() {
    console.log('start polling');
    this.timer = setTimeout(() => this.props.getStocktakeItem(), 2000);
  }

  _onChangePage(page) {
    this.setState({
      page: page
    })
  }

  _showTutorial() {
    const item = this.props.stocktakeItem;
    // Show tutorial if state is new or in progress and there is no one responsible for the stocktake yet
    return (
      (item.status === 'New' || item.status === 'In Progress') &&
      item.items.length === 0
    )

  }

  render() {
    return <Grid container justify={'center'}>
      <Grid item xs={11}>
        {this._showTutorial() ?
          <div>
            <StocktakeTutorial stocktakeItem={this.props.stocktakeItem}/>
          </div>
        :
          <div>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell width={300}>Name</TableCell>
                  <TableCell width={300}>Barcode</TableCell>
                  <TableCell>Details</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.props.stocktakeItem.items && this.props.stocktakeItem.items.slice(0).reverse().slice(this.state.page * PER_PAGE, PER_PAGE * (this.state.page + 1)).map((item, i) => {
                  return <TableRow key={i} hover onClick={() => alert('hello')}>
                  <TableCell width={300}>{item.name}</TableCell>
                  <TableCell width={300}>{item.barcode}</TableCell>
                  <TableCell>{item.details}</TableCell>
                  </TableRow>
                })}
              </TableBody>
            </Table>
            <TablePagination
              component="div"
              count={this.props.stocktakeItem.items && this.props.stocktakeItem.items.length}
              rowsPerPage={10}
              page={this.state.page}
              rowsPerPageOptions={[]}
              onChangePage={(e, page)=>{this._onChangePage(page)}}
            />
          </div>
        }
      </Grid>
    </Grid>
  }
}