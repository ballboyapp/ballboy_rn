import { storiesOf } from '@storybook/react-native';
import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import Colors from '../../../Themes/Colors';
import { WithApolloMockProvider } from '../../../GraphQL';
import GET_SPOTS_FOR_SPORT from '../../../GraphQL/Spots/Queries/GET_SPOTS_FOR_SPORT';
import Block from '../../Common/Block';
import SpotListCardSmall from '../../Spots/SpotListCardSmall';
import SpotListCard from '../../Spots/SpotListCard';
import SpotsList from './index';

class Container extends React.PureComponent {
  state = {
    selectedSpot: null,
  }

  render() {
    const { cardComponent } = this.props;
    const { selectedSpot } = this.state;

    return (
      <WithApolloMockProvider>
        <Query
          query={GET_SPOTS_FOR_SPORT}
          variables={{ sport: 'SOCCER' }}
        >
          {({ loading, error, data }) =>
          (loading || error ? null : (
            <Block bgColor={Colors.lightGray}>
              <SpotsList
                spots={data.spots || []}
                selectedSpot={selectedSpot}
                cardComponent={cardComponent}
                onCardPress={(spot) => {
                  this.setState({ selectedSpot: spot });
                }}
              />
            </Block>
          ))}
        </Query>
      </WithApolloMockProvider>
    );
  }
}

Container.propTypes = {
  cardComponent: PropTypes.func.isRequired,
};

storiesOf('Spots.SpotsList', module)
  .add('SpotsList small card', () => (
    <Container cardComponent={SpotListCardSmall} />
  ))
  .add('SpotsList big card', () => (
    <Container cardComponent={SpotListCard} />
  ));
