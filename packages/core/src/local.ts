import { DEFAULT_EBLOC_CONFIG } from './app/config';
import { MockPlugin } from './app/config/mocks/plugin/mock.plugin';
import { bootstrap } from './main';

bootstrap({ ...DEFAULT_EBLOC_CONFIG, plugins: [MockPlugin] });
