import React, { Component } from 'react';
import { Text, StyleSheet } from 'react-native';
import { Container, View, Fab, Icon } from 'native-base';
import Timeline from 'react-native-timeline-listview';

import share from '../share';
import { initAdd } from '../actions/input';

const styles = StyleSheet.create({
  title: {
    width: '100%',
    marginTop: 50,
    fontSize: 18,
    color: '#ccc',
    textAlign: 'center',
  },
  container: {
    width: '100%',
    height: '100%',
    padding: 20,
  },
  list: {
    width: '100%',
    height: 600,
    paddingTop: 5,
  },
});

export default class Main extends Component {
  constructor(props) {
    super(props);

    this.onPressAdd = this.onPressAdd.bind(this);
  }

  onPressAdd() {
    const { navigation } = this.props;
    const { dispatch } = share.store;
    share.inputIsEdit = !1;
    dispatch(initAdd());
    navigation.navigate('Add');
  }

  getContentJsx() {
    const { diaries } = this.props;

    if (!diaries || !diaries.length) return <Text style={styles.title}>No diaries.</Text>;

    const data = diaries.map(item => ({
      time: item.date.slice(5),
      title: item.date,
      description: item.text,
    }));

    return (
      <Container style={styles.container}>
        <Timeline
          data={data}
          circleSize={20}
          circleColor="rgb(45,156,219)"
          lineColor="rgb(45,156,219)"
          timeContainerStyle={{ minWidth: 52, marginTop: -5 }}
          listViewStyle={{ paddingTop: 5 }}
          detailContainerStyle={{ marginTop: -11 }}
          timeStyle={{ textAlign: 'center', backgroundColor: '#ff9797', color: 'white', padding: 5, borderRadius: 13 }}
          descriptionStyle={{ color: 'gray' }}
          style={styles.list}
        />
      </Container>
    );
  }

  render() {
    return (
      <Container>
        {this.getContentJsx()}
        <View style={{ flex: 1 }}>
          <Fab style={{ backgroundColor: '#5067FF' }} position="bottomRight" onPress={this.onPressAdd}>
            <Icon name="add" />
          </Fab>
        </View>
      </Container>
    );
  }
}
