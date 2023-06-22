import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class XmlService {

//really small portion of the original xml
  xml: string = `
  
  <?xml version="1.0" encoding="UTF-8" standalone="no" ?>
  <?xml-stylesheet type="text/xsl" href="browser_view.xslt"?>
  <?xmlspysps authentic_view.sps?>
  <ParametersGroup name="PARADIS_inputs">
  
    <ParametersGroup name="run_global">
      <ParametersGroup name="display_options">
        <ParametersGroup name="windows_1">
          <Parameter name="box">
            <description>description of the box</description>
            <possible_values>NO; FRAC_2D, FRAC_2D_FLOW; FRAC_3D; FRAC_3D_FLOW; MSFRAC; GRID; POROUS; POROUS_TRACKER</possible_values>
            <type>string</type>
            <value>NO</value>
            <default_value>NO</default_value>
          </Parameter>
          <Parameter name="function">
            <description>with FRAC2D : NETWORK_2D, NETWORK_2D1, NETWORK_2D2 ************************************************************** with FRAC_2D_FLOW : FLOW_2D, FLOW_2D1, FLOW_2D2, HEAD_2D, HEAD_2D1, HEAD_2D2, Ht, Ht_scale, Ht_simple, Ht_double, Tr, Tr_simple, Tr_double           ************************************************************** with FRAC3D : NETWORK_3D, FLOW_3D, MESHING_3D, HEAD_3D, PROJECTION_3D, DISCRETIZATION_3D, HULL_3D, FLOW2D_3D, MESHING2D_3D, PERM_3D **************************************************************** with MSFRAC : MULTI_NETWORK, MULTI_MODIFIED, MULTI_CONNECTED, MULTI_ADDED ************************************************************** with GRID : MAPFRAC_2D, MAPFRACFLOW_2D, FLOWBORDER0, FLOWBORDER1, FLOWBORDER2, MAPALPHA, KPROJ, KPERM, KPERMMEAN, KCLUSTER ************************************************************** with POROUS : POROUS_GRID_K, POROUS_GRID_H, POROUS_GRID_Ht POROUS_GRID_VNORM , POROUS_GRID_VX, POROUS_GRID_VY, POROUS_GRID_VZ, POROUS_GRID_K_PIEZOS ************************************************************** with POROUS_TRACKER : POROUS_GRID_RW, POROUS_GRID_RW_GRID</description>
            <possible_values>NO; NETWORK_2D; NETWORK_2D1; NETWORK_2D2 ; FLOW_2D; FLOW_2D1; FLOW_2D2; HEAD_2D; HEAD_2D1; HEAD_2D2; Ht; Ht_scale; Ht_simple; Ht_double; Tr; Tr_simple; Tr_double; NETWORK_3D; FLOW_3D; MESHING_3D; HEAD_3D; PROJECTION_3D; DISCRETIZATION_3D; HULL_3D; FLOW2D_3D; MESHING2D_3D; PERM_3D; MULTI_NETWORK; MULTI_MODIFIED; MULTI_CONNECTED; MULTI_ADDED; MAPFRAC_2D; MAPFRACFLOW_2D; FLOWBORDER0; FLOWBORDER1; FLOWBORDER2; MAPALPHA; KPROJ; KPERM; KPERMMEAN; KCLUSTER; POROUS_GRID_K; POROUS_GRID_H; POROUS_GRID_Ht; POROUS_GRID_VNORM; POROUS_GRID_VX; POROUS_GRID_VY; POROUS_GRID_VZ; POROUS_GRID_K_PIEZOS; POROUS_GRID_RW; POROUS_GRID_RW_GRID</possible_values>
            <type>string</type>
            <value>NO</value>
            <default_value>NO</default_value>
          </Parameter>
        </ParametersGroup>
      </ParametersGroup>
    </ParametersGroup>

  </ParametersGroup>
  `;


  xml2 = `
  <?xml version="1.0" encoding="UTF-8"?>
<!-- Jean-Raynald de Dreuzy (Géosciences Rennes) -->
<!DOCTYPE ParametersGroup SYSTEM "../../reference_params_scheme.dtd">

<ParametersGroup name="forecast">
	<Parameter name="forecast_site">
		<description>Name of the watershed for which we would like to forecast the seasonal streamflow.</description>
		<type>string</type>
		<possible_values>truc1;machin1;machin2;truc2</possible_values>
		<value/>
		<default_value>forecast_site.csv</default_value>
	</Parameter>
	<Parameter name="obs_events">
		<description>Database of historical records encompassing hydrological, climatic, and geological data from various regional watersheds.</description>
		<type>string</type>
		<possible_values/>
		<value/>
		<default_value>regional_object</default_value>
	</Parameter>
	<Parameter name="indicator">
		<description>Indicator's name used for calculating the similarity between two time series events</description>
		<type>string</type>
		<possible_values/>
		<value/>
		<default_value>Pearson's</default_value>
	</Parameter>
	<Parameter name="period">
		<description>Forecast horizon (can be one week, two weeks or a month for example).</description>
		<type>string</type>
		<possible_values/>
		<value/>
		<default_value>Week1</default_value>
	</Parameter>
	<Parameter name="variable">
		<description>Name of the variable for which we aim to compute the similarity.</description>
		<type>string</type>
		<possible_values/>
		<value/>
		<default_value>specific_discharge</default_value>
	</Parameter>
	<Parameter name="time_step">
		<description>Step duration of the variable (can be daily 'D', weekly 'W' or monthly 'M').</description>
		<type>string</type>
		<possible_values/>
		<value/>
		<default_value>D</default_value>
	</Parameter>
</ParametersGroup>

  `;
  constructor() { }
}
