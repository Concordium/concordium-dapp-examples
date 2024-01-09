use super::{state::*, error::*};

pub const MAX_BASIS_POINTS: u16 = 10000;
pub type ContractState<S> = State<S>;
pub type ContractResult<A> = Result<A, MarketplaceError>;
