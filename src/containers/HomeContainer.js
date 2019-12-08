import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  retrievePhotos,
} from '../appState/photos';

import Home from '../components/Home';

const mapStateToProps = (state) => ({
  photos: state.photos,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  retrievePhotos,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Home);
