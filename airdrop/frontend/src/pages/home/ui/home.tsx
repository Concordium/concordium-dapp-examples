import { IPFS_URL } from 'shared/config/urls.ts';

export default function Home() {
	return (
		<main className='flex min-h-max flex-col items-center justify-between p-24'>
			<h1 className='text-2xl'>Hello Concordium User!</h1>
			<p className='mt-4'>
				Here you can download simple metadata examples for testing the
				application:
			</p>
			<ul className='text-left flex flex-col mt-4'>
				<a
					className='text-blue-500 hover:text-blue-700'
					target='_blank'
					href={`${IPFS_URL}/Qmc6H9hNUAUsezyuXH7qgn4NuQnZzhQLzZepwaujCwRnus`}
				>
					example metadata 1
				</a>
				<a
					className='text-blue-500 hover:text-blue-700'
					target='_blank'
					href={`${IPFS_URL}/QmTuyCAgyCKXvFYExV8gP4R7CV5Eh9MJGdrMfJRXYKbGkQ`}
				>
					example metadata 2
				</a>
				<a
					className='text-blue-500 hover:text-blue-700'
					target='_blank'
					href={`${IPFS_URL}/QmTjAiTMYK4QF4dE6TE64LwPKaNi6SMCoVxkfqb2fLaB6h`}
				>
					example metadata 3
				</a>
			</ul>
		</main>
	);
}
