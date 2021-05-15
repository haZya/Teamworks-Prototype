import { Reducer } from '@reduxjs/toolkit';
import { injectReducer } from 'app/store/index';

const withReducer = (key: string, reducer: Reducer) => (WrappedComponent: React.ComponentType) => {
	injectReducer(key, reducer);

	return (props: any) => <WrappedComponent {...props} />;
};

export default withReducer;
