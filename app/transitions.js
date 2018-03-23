export default function(){
  const projectExplodeDuration = 600;

  this.transition(
    this.fromRoute('projects.index'),
    this.toRoute('projects.show'),
    this.use('explode', {
      matchBy: 'data-preview-background',
      use: ['fly-to', {duration: projectExplodeDuration, easing: 'easeInOutQuart'}]
    },{
      pickOld: '.c-project-preview--prev',
      use: ['toLeft', {duration: projectExplodeDuration, easing: 'easeInOutQuart'}]
    },{
      pickOld: '.c-project-preview--next',
      use: ['toRight', {duration: projectExplodeDuration, easing: 'easeInOutQuart'}]
    },{
      matchBy: 'data-preview-title',
      use: ['typo', ['font-size', 'padding-left'], {duration: projectExplodeDuration, easing: 'easeInOutQuart'}]
    },{
      use: ['fade', {duration: projectExplodeDuration / 2}]
    }),
    this.reverse('scrollThen', 'explode', { duration: 500 }, {
      matchBy: 'data-preview-background',
      use: ['fly-to', {duration: projectExplodeDuration, easing: 'easeInOutQuart'}]
    },{
      pickNew: '.c-project-preview--prev',
      use: ['toRight', {duration: projectExplodeDuration, easing: 'easeInOutQuart'}]
    },{
      pickNew: '.c-project-preview--next',
      use: ['toLeft', {duration: projectExplodeDuration, easing: 'easeInOutQuart'}]
    },{
      matchBy: 'data-preview-title',
      use: ['typo', ['font-size', 'padding-left'], {duration: projectExplodeDuration, easing: 'easeInOutQuart'}]
    },{
      use: ['fade', {duration: projectExplodeDuration / 2}]
    })
  );

  this.transition(
    this.fromRoute('home'),
    this.toRoute('projects'),
    this.use('toLeft'),
    this.reverse('toRight')
  );
}
