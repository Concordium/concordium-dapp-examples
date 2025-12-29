import { type FC } from 'react';

import { useFormFind } from '../hooks/use-form-find.ts';
import { InputNumber } from 'features/input-number';
import { LOCAL_STORAGE_KEY_LAST_CONTRACT_INDEX } from 'shared/config/local-storage.ts';
import { TextAlert } from 'shared/components/text-alert';
import { ButtonFind } from 'widgets/form-find/ui/button-find.tsx';

export const FormFind: FC = () => {
	const { register, errors, handleAction, errorMessage, isLoading } =
		useFormFind();

	const index = Number.parseInt(
		localStorage.getItem(LOCAL_STORAGE_KEY_LAST_CONTRACT_INDEX) || '4878',
	);

	return (
		<form onSubmit={handleAction}>
			<div className='flex flex-col gap-4'>
				<InputNumber
					{...{
						register,
						errors,
						name: 'index',
						defaultValue: index,
					}}
				/>
				<InputNumber
					{...{ register, errors, name: 'subindex', defaultValue: 0 }}
				/>

				<ButtonFind isLoading={isLoading} />
				{errorMessage && <TextAlert>{errorMessage}</TextAlert>}
			</div>
		</form>
	);
};
