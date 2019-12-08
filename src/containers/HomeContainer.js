import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  retrievePhotos,
} from '../appState/photos';

import Home from '../components/Home';

const mapDispatchToProps = (dispatch) => bindActionCreators({
  retrievePhotos,
}, dispatch);

export default connect(undefined, mapDispatchToProps)(Home);
