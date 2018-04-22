import React from 'react';
import {Grid, Icon, Table, TableBody, TableCell, TableHead, TablePagination, TableRow, Typography} from 'material-ui';
import green from 'material-ui/colors/green';
import blue from 'material-ui/colors/blue';
import red from 'material-ui/colors/red';
import _ from 'lodash';

const PER_PAGE = 10;

const STATE_MAPPINGS = {
  overdue: {
    state: 'Overdue',
    icon: 'fas fa-times-circle',
    style: { fontSize: 20, color: red[500], marginLeft: '.3rem' }
  },
  borrowed: {
    state: 'Borrowed',
    icon: 'fas fa-exclamation-circle',
    style: { fontSize: 20, color: blue[500], marginLeft: '.3rem' }
  },
  available: {
    state: 'Available',
    icon: 'fas fa-check-circle',
    style: { fontSize: 20, color: green[500], marginLeft: '.3rem' }
  }
};

export default class AssetTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 0
    }
  }

  _onChangePage(page) {
    this.setState({
      page: page
    })
  }

  _statusList() {
    const statusItems = [];

    Object.keys(STATE_MAPPINGS).map((item, i) => {
      let state = STATE_MAPPINGS[item];
      statusItems.push(
        <Typography variant={'caption'} key={i} style={{fontSize: 13, marginLeft: 20}}>
          <Icon className={state.icon} style={state.style}/>&nbsp;&nbsp;{state.state}
        </Typography>
      );
    });

    return statusItems;
  };

  _getAssetIcon(item) {
    if (item.borrowedDate === -1 || _.isUndefined(item.borrowedDate)) {
      return <Icon className={STATE_MAPPINGS['available'].icon} style={STATE_MAPPINGS['available'].style}/>
    }

    const now = new Date();
    const borrowedDate = new Date(item.borrowedDate*1000);
    const dueDate = new Date(borrowedDate.setDate(borrowedDate.getDate()+7));

    // Overdue
    if (now > dueDate) {
      return <Icon className={STATE_MAPPINGS['overdue'].icon} style={STATE_MAPPINGS['overdue'].style}/>
    }

    return <Icon className={STATE_MAPPINGS['borrowed'].icon} style={STATE_MAPPINGS['borrowed'].style}/>

  }

  render() {
    return <div>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Status</TableCell>
            <TableCell>Item</TableCell>
            <TableCell>Description</TableCell>
            <TableCell numeric>Total Count</TableCell>
            <TableCell>Availability</TableCell>
            <TableCell>Borrowed By</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {this.props.assetList.slice(this.state.page * PER_PAGE, PER_PAGE * (this.state.page + 1)).map((item, i) => {
            return <TableRow key={i} hover onClick={() => this.props.toggleDrawer(true, i)}>
              <TableCell>{this._getAssetIcon(item)}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.details}</TableCell>
              <TableCell numeric>{item.count}</TableCell>
              <TableCell >Available</TableCell>
              <TableCell >  </TableCell>
              <TableCell >RECENT</TableCell>
            </TableRow>
          })}
        </TableBody>
      </Table>
      <Grid container justify={'space-between'} style={{width: '100%'}}>
        <div style={{marginTop: '5px', display: 'flex', alignItems: 'center'}}>
          {this._statusList()}
        </div>
        <TablePagination
          component="div"
          count={this.props.assetList.length}
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
    </div>
  }
}