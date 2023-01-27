declare module 'ember-animated/components/animated-if' {
  import Component from '@ember/component';

  export class AnimatedIf extends Component<{
      Args: {
        Positional: [boolean]
        Named: {
            use: any;
            predicate?: boolean;
        };
      };
      Blocks: {
        default: [];
        else: [];
    };
  }> {}
  export default AnimatedIf;
}
