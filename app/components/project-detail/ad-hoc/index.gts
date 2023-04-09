import Component from '@glimmer/component';
import { bem } from 'portfolio/helpers/bem';
import ProjectModel from 'portfolio/models/project';
import styles from './styles.module.css';
import wrapperStyles from 'portfolio/assets/styles/objects/wrapper.module.css';

interface Signature {
  Element: HTMLDivElement;
  Args: {
    project: ProjectModel;
  }
}

export default class ProjectDetailAdHoc extends Component<Signature> {
  <template>
    <div class={{bem styles}} ...attributes>
      <div class={{bem wrapperStyles}}>
        {{{@project.html}}}
      </div>
    </div>
  </template>
}



