/* Card component, this is the Card that is used in a list of many Cards */

import React from 'react'
import { View } from 'react-native'

import { cardDetails } from './Styles/CardStyles'
import ImageSwiper from '../ImageSwiper'
import Header from './Header'
import Amenities from './Amenities'
import Text from '../Text'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'

export default class Spot extends React.PureComponent {
  render () {
    return (
      <Query
        query={GET_SPOT_DETAILS}
        variables={{ uuid: this.props.navigation.state.params.uuid }}
      >
        {({ loading, error, data }) => {
          if (loading) return <Text>Loading...</Text>
          if (error) return <Text>Error :( {JSON.stringify(error)}</Text>
          const spot = data.spot

          return (
            <View style={[cardDetails.container, this.props.style]}>
              <ImageSwiper
                style={{ height: 200 }}
                images={spot.images.map(image => image.image)}
              />
              <Header spot={spot} style={cardDetails.bottom} />
              {spot.amenities.length > 0 && (
                <Amenities amenities={spot.amenities[0].data} />
              )}
            </View>
          )
        }}
      </Query>
    )
  }
}

const GET_SPOT_DETAILS = gql`
  query spot($uuid: UUID) {
    spot(uuid: $uuid) {
      uuid
      name
      images {
        image
      }
      amenities {
        sport {
          category
        }
        data
      }
      sports {
        category
      }
      address {
        lat
        lng
      }
    }
  }
`
