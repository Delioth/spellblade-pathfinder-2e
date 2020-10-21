import Outer from '../../../../datashove';
import Element from '../../../../../components/ElementDisplay';

export { getStaticProps, getStaticPaths } from '../[element]';

const ElementEditor: typeof Element = (props) => {
  return <Outer kind={props.type} data={props} />;
};

export default ElementEditor;
