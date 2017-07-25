import React, { Component } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Button,
  Modal,
  ListView
} from 'react-native';

import {
  List,
  ListItem,
  Icon,
  CheckBox
} from 'react-native-elements';

import { connect } from 'react-redux';
import { removeFavoriteState, addFavoriteState } from '../../actions'
import TopHeader from '../top-header-view';

class StateList extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    this.state = {
      stateDataSource: ds.cloneWithRows(props.stateCatalogue),
      chosenStates: []

    }

    this.onDeletePress = this.onDeletePress.bind(this);
  }

  onDeletePress = (stateId) => {
    this.props.removeFavoriteState(stateId)
  }

  onAddStatesPress() {
    this.props.navigation.navigate('SelectFavoriteStates');
  }

  render() {
    const { params } = this.props.navigation.state;
    const { favoriteStates, getState, stateCatalogue } = this.props;

    return(
      <View style={styles.container}>
        <TopHeader title="Favorite States" rightIconFunction={this.onAddStatesPress.bind(this)} navigation={this.props.navigation}/>
        <List>
           {favoriteStates.map((stateId, index) => {
            const state = getState(stateId);
            return (
              <ListItem
                key={index}
                title={state.Name}
                rightIcon={{
                  name: 'delete',
                  color: 'red'
                }}
                onPressRightIcon={() => this.onDeletePress(stateId)}
              />
            );
          })} 
        </List>
      </View>
    );
  }
}

// class StateListItem extends Component {
//   render() {
//     const {navigate} = this.props.navigation;

//     return(
//       <Button 
//         title={this.props.itemState.name}
//         onPress={() => {navigate('SendPortCall', {selectedState: this.props.itemState})}} />
//     );
//   }
// }

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});

function mapStateToProps(state) {
  return {
    favoriteStates: state.states.favoriteStates,
    getState: state.states.stateById,
    stateCatalogue: state.states.stateCatalogue
  }
}

export default connect(mapStateToProps, {removeFavoriteState, addFavoriteState})(StateList);