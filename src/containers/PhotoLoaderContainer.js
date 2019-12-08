import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  retrievePhotos,
} from '../appState/photos';

import PhotoLoader from '../components/PhotoLoader';

const mapDispatchToProps = (dispatch) => bindActionCreators({
  retrievePhotos,
}, dispatch);

export default connect(undefined, mapDispatchToProps)(PhotoLoader);
