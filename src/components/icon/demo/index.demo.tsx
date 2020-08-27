import React from 'react';
import { createFromIconfontCN } from '..';
import { Button } from '../../button';

type IconType = 'gerenzhongxin' | 'listgrid';

const IconFont = createFromIconfontCN<IconType>({
  scriptUrl: '//at.alicdn.com/t/font_1847800_xsxhtsd2ixr.js', // 在 iconfont.cn 上生成
});

const IconFont2 = createFromIconfontCN();

function App() {
  return (
    <>
      <Button>
        <IconFont type="gerenzhongxin" />
      </Button>{' '}
      <Button>
        <IconFont2 type="xxx" />
      </Button>
    </>
  );
}

export default App;
