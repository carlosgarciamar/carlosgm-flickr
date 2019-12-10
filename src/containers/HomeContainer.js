import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  retrievePhotos,
  filterPhotos,
} from '../appState/photos';

import Home from '../components/Home';

const mapStateToProps = (state) => ({
  photos: state.photos.retrievedPhotos,
  filteredPhotos: state.photos.filteredPhotos,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  retrievePhotos,
  filterPhotos,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Home);
