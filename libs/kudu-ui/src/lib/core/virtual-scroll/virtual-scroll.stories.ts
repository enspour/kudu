import { Meta, StoryObj } from '@storybook/angular';
import { KuduVirtualScrollComponent } from './virtual-scroll.component';

type VirtualScroll = KuduVirtualScrollComponent<any, any> & {
  height: number;
};

const meta: Meta<VirtualScroll> = {
  component: KuduVirtualScrollComponent,
  argTypes: {
    height: { control: 'number' },
    elements: { control: { disable: true } },
    elementHeight: { control: 'number' },
    render: { control: 'select', options: ['transform', 'position'] },
  },
  args: {
    height: 500,
    elements: [...Array(10000)].map((_, i) => i),
    elementHeight: 30,
    render: 'transform',
  },
};

export default meta;

type Story = StoryObj<VirtualScroll>;

export const Example: Story = {
  render: (args) => ({
    props: args,
    template: `
      <kudu-virtual-scroll
        #viewport
        [elements]="elements"
        [elementHeight]="elementHeight"
        [style.height.px]="height"
      >
        @for (element of viewport.rangeElements(); track element.index) {
          <div [style.height.px]="elementHeight">
            {{ element.index }}
          </div>
        }
      </kudu-virtual-scroll>
    `,
  }),
};