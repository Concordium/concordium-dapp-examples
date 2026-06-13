import { FC, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { routeConfig } from 'app/providers/router/config/route-pages.tsx';
import { PageLoader } from 'widgets/page-loader';

export const Router: FC = () => {
	return (
		<Routes>
			{Object.values(routeConfig).map(({ path, element }) => (
				<Route
					key={path}
					path={path}
					element={
						<Suspense fallback={<PageLoader />}>
							<div className='page-wrapper'>{element}</div>
						</Suspense>
					}
				/>
			))}
		</Routes>
	);
};
