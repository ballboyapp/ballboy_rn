import { storiesOf } from '@storybook/react-native';
import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import activityDetailsQuery from '../../../GraphQL/Activities/Queries/activityDetails';
import Organizer from '.';

const Container = ({ textSize }) => (
  <Query
    query={activityDetailsQuery}
    variables={{ _id: '1' }}
  >
    {({ loading, error, data }) => {
      if (loading || error) return null;

      return (
        <Organizer
          organizer={data.activityDetails.organizer}
          textSize={textSize}
          description="Some dscription here \n Hola"
        />
      );
    }}
  </Query>
);

Container.propTypes = {
  textSize: PropTypes.string,
};

Container.defaultProps = {
  textSize: 'SM',
};

storiesOf('Games.Organizer', module)
  .add('Organizer S textSize', () => (
    <Container textSize="S" />
  ))
  .add('Organizer default textSize (SM)', () => (
    <Container />
  ))
  .add('Organizer M textSize', () => (
    <Container textSize="M" />
  ));

