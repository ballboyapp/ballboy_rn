import React from 'react';
import PropTypes from 'prop-types';
// import { TouchableOpacity } from 'react-native';
import { FlatList } from 'react-native';
import styled from 'styled-components/native';
import I18n from '../../../I18n';
import Row from '../../Common/Row';
import Spacer from '../../Common/Spacer';
import Text from '../../Common/Text';
// import Icon from '../../Common/Icon';
import Tag from '../../Common/Tag';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const FlexOne = styled.View`
  flex: 1;
  overflow: hidden;
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const SpotsFilterFlap = ({
  maxDistance,
  allSports,
  selectedSports,
  // onClose,
}) => {
  // console.log('SELECTED_SPORTS', selectedSports);
  const tags = [{
    index: 'distance',
    value: `< ${maxDistance.toFixed(1).toString().replace('.0', '')}km`,
    status: 'warning',
  }];

  if (allSports) {
    tags.push({
      index: 'all-sports',
      value: I18n.t('spotsFilterFlap.allSports'),
      status: 'success',
    });
  } else {
    selectedSports.forEach((sport) => {
      tags.push({
        index: sport,
        value: I18n.t(sport),
        status: 'success',
      });
    });
  }

  return (
    <Row alignItems="center">
      <Text size="M">
        {I18n.t('spotsFilterFlap.label')}
      </Text>
      <Spacer row size="M" />
      <FlexOne>
        <FlatList
          horizontal
          keyExtractor={item => item.index}
          data={tags}
          renderItem={({ item }) => (
            <Tag
              value={item.value}
              status={item.status}
              // reverse
            />
          )}
          ItemSeparatorComponent={() => <Spacer key="spacer" row size="M" />}
        />
      </FlexOne>
      {/* <TouchableOpacity onPress={onClose}>
        <Icon
          iconSet="MaterialIcons"
          iconName="close"
          size={24}
          color="black"
        />
      </TouchableOpacity> */}
    </Row>
  );
};

SpotsFilterFlap.propTypes = {
  maxDistance: PropTypes.number,
  allSports: PropTypes.bool,
  selectedSports: PropTypes.arrayOf(PropTypes.string),
  // onClose: PropTypes.func,
};

SpotsFilterFlap.defaultProps = {
  maxDistance: 20,
  allSports: true,
  selectedSports: [],
  // onClose: () => {},
};

export default SpotsFilterFlap;
