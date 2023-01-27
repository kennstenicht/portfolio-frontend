declare module 'ember-animated/components/animated-value' {
  import Component from '@ember/component';

  export class AnimatedValue extends Component<{
      Args: {
        Named: {
            use: any;
            predicate?: boolean;
            value: any;
            duration: number;
        };
      };
      Blocks: {
        default: [any];
    };
  }> {}
  export default AnimatedValue;
}
