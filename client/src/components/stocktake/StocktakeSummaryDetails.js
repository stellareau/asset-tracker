import React from 'react';
import {
  Button, Grid, Hidden, Icon, IconButton, Table, TableBody, TableCell, TableHead, TablePagination, TableRow,
  Typography
} from 'material-ui';
import StocktakeTutorial from './StocktakeTutorial';

export default class StocktakeSummaryDetails extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.stocktakeItem !== this.props.stocktakeItem) {
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
    // this.timer = setTimeout(() => this.props.getStocktakeItem(), 1000);
  }

  render() {
    const aa = this.props.stocktakeItem;

    return <Grid container justify={'center'}>
      <Grid item xs={11}>
        {aa.status === 'New' ?
          <div>
            <StocktakeTutorial/>
          </div>
        :
          <div>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Barcode</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {aa.assets && aa.assets.map((item, i) => {
                  return <TableRow key={i} hover onClick={() => alert('hello')}>
                  <TableCell>{item.name}</TableCell>
                  </TableRow>
                })}
              </TableBody>
            </Table>
            <TablePagination
              component="div"
              count={2}
              rowsPerPage={10}
              page={0}
              rowsPerPageOptions={[]}
              onChangePage={() => {}}
              onChangeRowsPerPage={() => {}}
            />
          </div>
        }
      </Grid>
    </Grid>
  }
}