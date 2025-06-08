---
created: 2025-01-17T00:00:00.000Z
modified: 2025-06-08T00:00:00.000Z
tags:
  - notes
  - 3dprinting
title: 3D Printing Workflow
description: Notes on 3D Printer usage and maintenance
date: 2025-01-17T00:00:00.000Z
permalink: 3-d-printing-workflow/
layout: post.njk
thumbnail: /content/attachments/placeholder.png
---
Notes on 3D Printer usage and maintenance
# 3D Printing Workflow
I own a Bambu Lab A1, so some sections may make specific reference to the Bambu Lab A1.
# 1 Model
## 1.1 Find a model
You can source many free models from these sites. They will typically be `.stl` or `.3mf` files, which are both formats to represent 3D models.
* [Thangs](https://thangs.com/) - aggregator; searches across multiple sites
* [Yeggi](https://www.yeggi.com/) - aggregator; searches across multiple sites
* [Printables](https://www.printables.com/) - owned by Prusa
* [Makerworld](https://makerworld.com/) - owned by Bambu

## 1.2 Make your own model
Most people will use parametric CAD software for creating things to print, meaning you build up a model through well-defined, step-by-step constraints and parameters. This ensures you can create precise models with precise measurements.

Most 3D modelling software like SOLIDWORKS, Fusion 360, or AutoCAD have absurd pricing models. Luckily, if you have experience with any parametric CAD software, you will get the hang of other ones since they all have very similar flows. I recommend the below software instead.
* [Onshape](https://www.onshape.com/) - free, easy to use, public storage, requires internet
* [FreeCAD](https://www.freecad.org/) - free, open source, runs locally

When making a model in parametric CAD software, this is the typical workflow
* Create a 2D "sketch" of one face of model with the proper measurements
* "Extrude" or "Pad" the sketch to turn the sketch into a 3D shape
* "Chamfer" or "Fillet" to cut away corners of your shape
* "Extrude inwards" or "Pocket" new sketches to cut away sections of your shape
* "Loft" or "Revolve" to create shapes with curved geometry
# 2 Slice
I am using Bambu Studio as my slicer. [Orca Slicer](https://orca-slicer.com/) is based on Bambu Studio and is a good alternative.

## 2.1 Baseline
1. Import `.stl` or `.3mf` file
2. Make sure filament is configured correctly in top left
3. Make sure nozzle type is configured correctly in top left
4. You can change the preset (ex. 0.20mm Standard @BBL A1") to change the layer height, or configure it manually.
	1. Smaller layer height = finer printing detail
	2. Taller layer height = generally faster prints

## 2.2 Position model
1. Click on imported model on the base plate
2. Top bar > Auto orient
	1. This usually will put the model on the biggest face with least overhangs for optimal printing
	2. You can also use Top bar > Lay on face
3. Top bar > Arrange objects
	1. This will space out multiple models across your base plate or center a single model

## 2.3 Set infill
This article by Prusa gives a good overview of the different infill patterns and their use cases: https://help.prusa3d.com/article/infill-patterns_177130.
1. Strength > Sparse infill pattern > Set to "Gyroid"
	1. From what I have read gyroid is a good all-around infill pattern that provides strength from all sides
2. Strength > Sparse infill density > Keep at 15%
	1. 10% - 25% is usually all that is necessary

## 2.4 Set support if needed
You will need support if the model has a lot of overhangs in its current orientation
1. Support > Enable support
2. Support > Type > Tree (auto)
	1. This is generally the support that will work the best. You can also use normal support if tree doesn't look quite right for your use case

## 2.5 Cut model if needed
This allows you to take one model and split it into multiple pieces you can glue together afterwards. Handy for removing large overhangs that require a lot of extra support while printing
1. Top bar > Cut
2. Mode > Dovetail or Planar

## 2.6 Slice
This will take all of the previous modifications you made and generate the path that the 3D printer will travel in order to print your model. You can verify the supports and printing order look reasonable here.
1. Top left > Preview or Top right >Slice plate
2. Bottom bar allows you to seek through the path for the current layer
3. Left bar allows you to see the path that is printed layer by layer

## 2.7 Export
In my case, I manually walk my SD card over to the printer before printing.
1. Top right > Downward arrow left of Print plate > Export plate sliced file
2. Save the `.gcode.3mf` file to the SD card that is going into the printer
3. Extra note: Some printers don't support hot-plugging of the SD card. Be mindful of this and manually unmount the SD card from the printer UI if needed before removing the SD card. This can help prevent the SD card from getting corrupted.
# 3 Print
Plug the SD card with the `.gcode.3mf` file over to the printer and go through the printer's UI to select the file to print. Start the print!
* It is generally a good idea to watch and make sure the first few layers are adhering to the base plate correctly before leaving the printer alone and letting it finish

Once the print is complete, let the base plate cool before taking the print off. When using the textured plate, you will generally not need to scrape the print off as long as the base plate cools to < 30 degrees C. The print should lift right off of the plate.
* I can't speak to other plate types as I have only used the Bambu Labs textured plate
# 4 Maintain
[How to lubricate the Bambu Lab A1 & A1 Mini](https://youtu.be/DXf_MfdNpZ4?si=wey2O1nHrL_VoMUf) by Fat Dragon Games is a great walkthrough on the needed materials and process for lubricating the Bambu Lab A1. My guide here is more or less copied from this video. They recommend:
* Cleaning and re-lubricating the x and y axis every 2 weeks (oil)
* Cleaning and re-lubricating the z axis screw every 4 weeks (grease)
## 4.1 Requirements
* Lubricating oil - For lubricating linear rails (x and y axis)
	* Super Lube 51004 synthetic oil
* Lubricating grease - For lubricating Z-axis screws
	*  Super Lube 21030 grease
* Sponge-tip swabs - For applying oil and grease
* Non-woven fabric/towel - For cleaning off old oil/grease without leaving lint
* (Optional) Nylon bristle cleaning brushes - For cleaning off old oil/grease without leaving lint or scratches
## 4.2 Steps
1. Clean the top linear rail (X-Axis)
	1. Wipe the top and bottom with a non-woven cloth to clean it
	2. Use a nylon brush on the top and bottom to clean the grooves more. You can wipe the dirt off the brush on another non-woven cloth.
	3. Wipe it with a non-woven cloth again
2. Apply OIL to the top linear rail (X-Axis)
	1. Soak the applicator sponge in oil
	2. Wipe the oil into the top and bottom groove. Avoid pooling. We want a thin coat of oil across all of the rail.
3. Clean the two bottom linear rails (Y-Axis)
	1. Pop open the tabbed bottom cover
	2. Wipe top/left/right side of each rail with a non-woven cloth to clean it
4. Apply OIL to the bottom linear rails (Y-Axis)
	1. Soak the applicator sponge in oil
	2. Apply oil to top/left/right sides of both rails
	3. Carefully put cover back and gently align the tabs on front and back
5. Clean the two Z screws (Z-Axis)
	1. Clean out old grease hunks with a nylon brush. Wipe your brush on a nonwoven cloth to clean the brush.
	2. Wipe down any extra grease on the sides with the nonwoven cloth
6. Apply GREASE to the two Z screws (Z-Axis)
	1. Apply blob of grease onto the sponge applicator
	2. Distribute blobs of grease on 3-4 spots across the z screw
	3. Work the grease into the threads on these spots
	4. The grease will be automatically distributed as the z axis moves
