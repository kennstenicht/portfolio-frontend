import Component from '@glimmer/component';
import { hash } from '@ember/helper';
import bem from 'portfolio/helpers/bem';
import styles from './styles.module.css';
import ProjectModel from 'portfolio/models/project';

interface Signature {
  Element: HTMLDivElement;
  Args: {
    project: ProjectModel;
  }
}

export default class ProjectDetailSimmaryComponent extends Component<Signature> {
  <template>
    <div class={{bem styles (hash style=@project.id)}} ...attributes>
      <div class={{bem styles "excerpt"}}>
        {{@project.excerpt}}
      </div>
      <div class={{bem styles "meta-info"}}>
        {{@project.facts}}
      </div>
    </div>
  </template>
}
