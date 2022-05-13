import { render } from '../testUtils';
import Home from '../../pages';

describe('Home page', () => {
  it('matches snapshot', () => {
    // TODO: mock Date :)
    const { asFragment } = render(<Home />, {});
    expect(asFragment()).toMatchSnapshot();
  });
});
