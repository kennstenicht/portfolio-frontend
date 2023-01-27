declare module 'ember-animated/components/animated-each' {
  import Component from '@ember/component';

  export class AnimatedEach extends Component<{
      Args: {
        Named: {
            use: any;
            items: any[];
            duration: number;
            finalRemoval: boolean;
            initialInsertion: boolean
        };
      };
      Blocks: {
        default: [any, number];
    };
  }> {}
  export default AnimatedEach;
}
