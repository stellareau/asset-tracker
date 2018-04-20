import React from 'react';
import PropTypes from 'prop-types';
import {
  Button, Collapse, Divider, ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary, Grid, Icon, IconButton,
  LinearProgress,
  List,
  ListItem, ListItemIcon, ListItemText,
  Paper,
  SwipeableDrawer, TextField,
  Typography
} from 'material-ui';
import green from 'material-ui/colors/green';
import grey from 'material-ui/colors/grey';
import _ from 'lodash';
import {config} from '../../config';
import FormField from '../../templates/FormField';

const formFields = [
  {key: 'name', label: 'Name'},
  {key: 'details', label: 'Details'},
  {key: 'barcode', label: 'Barcode'},
  {key: 'count', label: 'Count'},
];

const styles = {
  img: {
    display: 'block',
    width: '90%',
    height: 'auto',
  },
  imgContainer: {
    display: 'flex',
    justifyContent: 'center'
  }
};

export default class AssetDetails extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      expanded: 'panel1',
      open: false
    }
  }

  _handleChangePanel(panel) {
    this.setState({
      expanded: panel
    })
  }

  _expandHistoryDetails() {
    this.setState({
      open: !this.state.open
    })
  }

  render() {
    return <SwipeableDrawer
      anchor={'right'}
      open={this.props.isDrawerOpen}
      onClose={() => this.props.toggleDrawer(false)}
      onOpen={() => this.props.toggleDrawer(true)}
    >
      <Grid container direction={'column'} style={{width: '550px'}}>
        <div style={{display: 'flex', flexDirection: 'column', height: '100vh'}}>
          <div style={{flex: 1}}>
            <Grid container justify={'space-between'}>
              <Typography variant="subheading" style={{margin: '20px 40px 10px 40px'}}>
                Item Details
              </Typography>

              <IconButton onClick={() => this.props.toggleDrawer(false)}>
                <Icon className={'fas fa-times'} style={{color: grey[400], fontSize: 18}}/>
              </IconButton>
            </Grid>

            <Typography variant="display1" style={{margin: '0 40px 20px 40px'}}>
              {this.props.assetDetails.name} <Icon className={'fas fa-check-circle'} style={{color: green[400], fontSize: '30px'}}/>
            </Typography>

            <div style={{display: 'flex', justifyContent: 'center'}}>
              <img src={`${config.images}/cat.jpg`} style={{maxWidth: '90%', maxHeight: '350px', height: 'auto', width: 'auto'}}/>
            </div>

            <Grid container justify={'center'} style={{margin: '20px 0'}}>
              <Grid item xs={11}>
                <ExpansionPanel expanded={this.state.expanded === 'panel1'} onChange={() => this._handleChangePanel('panel1')}>
                  <ExpansionPanelSummary expandIcon={<Icon className={'fas fa-angle-down'} style={{color: grey[800]}}/>}>
                    <Typography variant={'title'}>General Information</Typography>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                    <Grid container direction={'column'}>
                      {!_.isEmpty(this.props.assetDetails) && formFields.map((item, i) => {
                        return <FormField key={i} label={item.label}>
                          <TextField value={this.props.assetDetails[item.key]} fullWidth={true} onChange={(e) => this.props.onChangeAsset(item.key, e.target.value)}/>
                        </FormField>
                      })}
                    </Grid>
                  </ExpansionPanelDetails>
                </ExpansionPanel>

                <ExpansionPanel expanded={this.state.expanded === 'panel2'} onChange={() => this._handleChangePanel('panel2')} disabled={_.isEmpty(this.props.assetDetails.borrowedBy)}>
                  <ExpansionPanelSummary expandIcon={<Icon className={'fas fa-angle-down'} style={{color: grey[800]}}/>}>
                    <Typography variant={'title'}>Borrowers Information</Typography>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                    {!_.isEmpty(this.props.assetDetails.borrowedBy) && <Grid container alignItems={'center'}>
                      <Grid item xs={6}>
                        <Typography variant={'body1'}>
                          <Icon className={'far fa-user'} style={{fontSize: 15}}/> &nbsp;&nbsp; {this.props.assetDetails.borrowedBy.user}
                        </Typography>
                        <br/>
                        <Typography variant={'body1'}>
                          <Icon className={'far fa-envelope'} style={{fontSize: 15}}/> &nbsp;&nbsp; {this.props.assetDetails.borrowedBy.email}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Grid container justify={'flex-end'}>
                          <IconButton><Icon className={'fas fa-comment-alt'} style={{fontSize: 17}}/></IconButton>
                          <IconButton><Icon className={'fas fa-envelope'} style={{fontSize: 17}}/></IconButton>
                          <IconButton><Icon className={'fas fa-address-card'} style={{fontSize: 17}}/></IconButton>
                          <IconButton><Icon className={'fas fa-phone'} style={{fontSize: 17}}/></IconButton>
                        </Grid>
                      </Grid>

                      <Grid container>
                        <Grid item xs={12}>
                        <Divider style={{margin: '20px 0'}}/>
                          <Typography variant={'body1'}>
                            <span style={{fontSize: 12}}>Borrow Date:</span> &nbsp;&nbsp; 27/01/2018
                          </Typography>
                          <br/>
                          <Typography variant={'body1'}>
                            <span style={{fontSize: 12}}>Return Date:</span> &nbsp;&nbsp; 27/01/2018
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                    }
                  </ExpansionPanelDetails>
                </ExpansionPanel>

                <ExpansionPanel expanded={this.state.expanded === 'panel3'} onChange={() => this._handleChangePanel('panel3')}>
                  <ExpansionPanelSummary expandIcon={<Icon className={'fas fa-angle-down'} style={{color: grey[800]}}/>}>
                    <Typography variant={'title'}>History</Typography>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                    <List component={'nav'} style={{width: '100%'}}>
                      <ListItem button><ListItemText primary="766b43f0-42c2-11e8-a620-5b2c4d44cd30" /></ListItem>
                      <ListItem button><ListItemText primary="766b43f0-42c2-11e8-a620-5b2c4d44cd30" /></ListItem>
                      <ListItem button><ListItemText primary="766b43f0-42c2-11e8-a620-5b2c4d44cd30" /></ListItem>
                      <ListItem button><ListItemText primary="766b43f0-42c2-11e8-a620-5b2c4d44cd30" /></ListItem>
                      <ListItem button onClick={() => this._expandHistoryDetails()}>
                        <ListItemText primary={<span>766b43f0-42c2-11e8-a620-5b2c4d44cd30 &nbsp; <Icon className={'far fa-comment'} style={{fontSize: 14}}/></span>} />
                        <Icon className={this.state.open ? 'fas fa-angle-up' : 'fas fa-angle-down'} style={{color: grey[600]}}/>
                      </ListItem>
                      <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                          <ListItem button>
                            <ListItemText inset primary="I am going to use this to take over the world!" />
                          </ListItem>
                        </List>
                      </Collapse>
                    </List>
                  </ExpansionPanelDetails>
                </ExpansionPanel>
              </Grid>
            </Grid>
          </div>

          <Paper>
            {this.props.isDeletingAsset && <LinearProgress color="secondary"/>}
            {this.props.isUpdatingAsset && <LinearProgress color="primary"/>}
            <Grid container justify={'flex-end'} style={{padding: '20px'}} alignItems={'center'}>
              <Button variant="raised" color="secondary" onClick={() => this.props.deleteAsset()}><span><Icon className={'fas fa-trash-alt'} style={{fontSize: '14px'}}/>&nbsp;&nbsp;Delete</span></Button>
              &nbsp;&nbsp;&nbsp;
              <Button variant="raised" color="primary" onClick={() => this.props.updateAsset()}><span><Icon className={'fas fa-save'} style={{fontSize: '14px'}}/>&nbsp;&nbsp;Update</span></Button>
            </Grid>
          </Paper>
        </div>
      </Grid>


    </SwipeableDrawer>
  }
}

AssetDetails.propTypes = {
  isDrawerOpen: PropTypes.bool.isRequired,
  toggleDrawer: PropTypes.func.isRequired
};