import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import { ThemeProvider } from 'styled-components/native';
import spotsQuery from '../../../GraphQL/Spots/Queries/spots';
import mockClient, { ApolloMockProvider } from '../../../GraphQL/ApolloMockClient';
import scTheme from '../../../Themes/scTheme'; // styled-components theme
import SpotSlide from '.';

describe('SpotSlide', () => {
  let spots;

  beforeAll(async () => {
    const res = await mockClient.query({
      query: spotsQuery,
      variables: {
        limit: 1,
        offset: 0,
      },
    });
    spots = res.data.spots; // eslint-disable-line prefer-destructuring
  });

  it('renders without crashing', () => {
    const rendered = renderer.create(
      <ApolloMockProvider>
        <ThemeProvider theme={scTheme}>
          <SpotSlide />
        </ThemeProvider>
      </ApolloMockProvider>,
    ).toJSON();
    expect(rendered).toBeTruthy();
  });

  it('calls onChange when spot field is changed', () => {
    const handleChange = jest.fn();
    const wrapper = shallow(<SpotSlide onChange={handleChange} />);

    wrapper.find({ testID: 'pickSpot' }).props().onCardPress(spots[0]);

    expect(handleChange).toBeCalledWith(
      expect.objectContaining({ fieldName: 'spot', value: spots[0] }),
    );
  });
});
